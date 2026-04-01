const axios = require('axios');
const Order = require('../../models/order');

async function createCheckout(req, res) {
    try {
        const { items, customerEmail } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ error: "Carrinho vazio" });
        }

        // 1. Recalcular o total e formatar para o PagBank
        let totalValue = 0;
        const formattedItems = items.map(item => {
            totalValue += parseFloat(item.price);
            return {
                name: item.name,
                quantity: 1,
                unit_amount: Math.round(item.price * 100) // Converte para centavos
            };
        });

        // 2. Criar o registro no banco (Seu Model Order)
        const newOrder = await Order.create({
            products: JSON.stringify(items),
            totalValue: totalValue,
            status: 'PENDENTE'
        });

        // 3. Montar o corpo da requisição para o PagBank
        const pagBankBody = {
            reference_id: newOrder.id.toString(),
            customer: {
                name: "Cliente Cloud Store",
                email: customerEmail || "cliente@email.com",
                tax_id: "12345678909", 
                phones: [{ country: "55", area: "71", number: "999999999", type: "MOBILE" }]
            },
            items: formattedItems,
            qr_codes: [{ amount: { value: Math.round(totalValue * 100) } }],
            shipping: { 
                address: { 
                    street: "Rua Ficticia", number: "0", city: "Salvador", 
                    state: "BA", country: "BRA", postal_code: "40000000" 
                } 
            },
            notification_urls: [`${process.env.APP_URL}/webhook/pagbank`]
        };

        // 4. Chamada Axios para o PagBank
        const response = await axios.post('https://api.pagseguro.com/orders', pagBankBody, {
            headers: {
                'Authorization': `Bearer ${process.env.PAGBANK_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        // 5. Retornar o link de pagamento para o Front
        const paymentLink = response.data.links.find(link => link.rel === 'PAY').href;
        return res.json({ url: paymentLink });

    } catch (error) {
        console.error("ERRO NO CHECKOUT:", error.response ? error.response.data : error.message);
        return res.status(500).json({ error: "Falha ao gerar pagamento" });
    }
}

module.exports = { createCheckout };