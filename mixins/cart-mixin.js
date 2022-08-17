export const cartMixin = {
    computed: {
        cmTotalPrices() {
            return (cruisePrices, exPrices) => [
                {
                    name: "Стоимость:",
                    value: this.cmCruiseTariffPrice(cruisePrices),
                },
                {
                    name: "Экскурсии:",
                    value: this.cmExcursionsPrice(exPrices),
                },
                {
                    name: "Итого к оплате:",
                    value: this.cmCruiseTariffPrice(cruisePrices) + this.cmExcursionsPrice(exPrices),
                },
            ];
        },
        cmCruiseTariffPrice() {
            return (prices, priceProperty = "price") => {
                return prices && prices.length > 0 ? prices.reduce((a, b) => a + Number(b[priceProperty]), 0) : 0;
            };
        },
        cmExcursionsPrice() {
            return (selectedExcursions, options = { listName: "list", idField: "id" }) => {
                let sum = 0;

                if (selectedExcursions && selectedExcursions.length > 0) {
                    let summaryList = [];

                    selectedExcursions.forEach(selectedExItem => {
                        let summary = 0;

                        if (selectedExItem[options.listName]) {
                            summary = selectedExItem[options.listName].reduce((a, b) => a + Number(b.price), 0);
                        } else {
                            summary = selectedExItem.price;
                        }

                        const summaryListItem = {
                            id: selectedExItem[options.idField],
                            price: summary,
                        };

                        if (summaryList.length > 0) {
                            summaryList = [...summaryList, summaryListItem];
                        } else {
                            summaryList = [summaryListItem];
                        }
                    });

                    sum = summaryList.reduce((a, b) => a + Number(b.price), 0);
                }

                return sum;
            };
        },
    },
};
