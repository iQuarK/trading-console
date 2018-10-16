const server = require('./index.js');

describe('Server functions', () => {
    describe('zipTrades', () => {
        test('if a trade is a multidimensional array with an ID, all of them should be processed', () => {
            const trades = [63,[[305257030,1539692500540,-0.02,6772.9],[305257023,1539692498066,0.071,6773],[305257021,1539692496996,0.03256159,6773],[305257015,1539692494855,0.01610451,6773]]];

            expect(server.zipTrades('trades', trades)).toEqual([
                {id: 305257030, mts: 1539692500540, amount: -0.02, price: 6772.9},
                {id: 305257023, mts: 1539692498066, amount: 0.071, price: 6773},
                {id: 305257021, mts: 1539692496996, amount: 0.03256159, price: 6773},
                {id: 305257015, mts: 1539692494855, amount: 0.01610451, price: 6773}
            ]);
        });
        test('if a trade is a multidimensional array, all of them should be processed', () => {
            const trades = [[305257030,1539692500540,-0.02,6772.9],[305257023,1539692498066,0.071,6773],[305257021,1539692496996,0.03256159,6773],[305257015,1539692494855,0.01610451,6773]];

            expect(server.zipTrades('trades', trades)).toEqual([
                {id: 305257030, mts: 1539692500540, amount: -0.02, price: 6772.9},
                {id: 305257023, mts: 1539692498066, amount: 0.071, price: 6773},
                {id: 305257021, mts: 1539692496996, amount: 0.03256159, price: 6773},
                {id: 305257015, mts: 1539692494855, amount: 0.01610451, price: 6773}
            ]);
        });
        test('if a trade is a single value one, it should return one element', () => {
            const trades = [90338,"te",[305257213,1539692581857,0.00590624,6773]];

            expect(server.zipTrades('trades', trades)).toEqual([
                {id: 305257213, mts: 1539692581857, amount: 0.00590624, price: 6773}
            ]);
        });
        test('if a trade is string valued then it should be ignored by returning empty array', () => {
            const trades = [90338,"hb"];

            expect(server.zipTrades('trades', trades)).toEqual([]);
        });
    });

    describe('zipBooks', () => {
        test('if a book is a multidimensional array with an ID, all of them should be processed', () => {
            const books = [638438,[[6786.8,7,2.50391057],[6786.6,1,0.1472187],[6786.3,1,0.29437999],[6786.2,1,0.33620688]]];

            expect(server.zipBooks('book', books)).toEqual([
                {price: 6786.8, count: 7, amount: 2.50391057},
                {price: 6786.6, count: 1, amount: 0.1472187},
                {price: 6786.3, count: 1, amount: 0.29437999},
                {price: 6786.2, count: 1, amount: 0.33620688}
            ]);
        });
        test('if a book is a multidimensional array, all of them should be processed', () => {
            const books = [[6786.8,7,2.50391057],[6786.6,1,0.1472187],[6786.3,1,0.29437999],[6786.2,1,0.33620688]];

            expect(server.zipBooks('book', books)).toEqual([
                {price: 6786.8, count: 7, amount: 2.50391057},
                {price: 6786.6, count: 1, amount: 0.1472187},
                {price: 6786.3, count: 1, amount: 0.29437999},
                {price: 6786.2, count: 1, amount: 0.33620688}
            ]);
        });
        test('if a book is a single value one, it should return one element', () => {
            const books = [234865,[6786.4,0,1]];

            expect(server.zipBooks('book', books)).toEqual([
                {price: 6786.4, count: 0, amount: 1}
            ]);
        });
        test('if a book is string valued then it should be ignored by returning empty array', () => {
            const books = [234865,"hb"];

            expect(server.zipBooks('book', books)).toEqual([]);
        });
    });
});