export function configureFakeBackend() {
    let users = [{
        id: 1,
        email: 'test@gmail.com',
        password: 'test',
        firstName: 'Lucky',
        lastName: 'Guest',
        AssociatedProducts: [
            {
                id: 1,
                imagePath: "../src/images/image1.png",
                name: "SHINGLAS многослойная черепица, Ранчо, Коричневый, 2 м2",
                quantity: "78 уп.",
                PiecePrice: "589.00",
                cost: "45 471.00",
            },
            {
                id: 2,
                imagePath: "../src/images/image2.png",
                name: "Черепица конька/карниза (уп. 12 п.м / 20 п.м)",
                quantity: "3 уп.",
                PiecePrice: "4 988.00",
                cost: "13 717.00"
            },
            {
                id: 3,
                imagePath: "../src/images/image3.png",
                name: "Планка карниза, 2 м",
                quantity: "15 шт.",
                PiecePrice: "595.00",
                cost: "8 925.00"
            },
            {
                id: 4,
                imagePath: "../src/images/image4.png",
                name: "Планка ветровая, 2 м",
                quantity: "10 шт.",
                PiecePrice: "780.00",
                cost: "7 800.00"
            },
            {
                id: 5,
                imagePath: "../src/images/image5.png",
                name: "Ковер подкладочный, рулон 15 м2",
                quantity: "11 шт.",
                PiecePrice: "3 829.00",
                cost: "39 439.00"
            },
            {
                id: 6,
                imagePath: "../src/images/image6.png",
                name: "Лист OSB, 2500x1250x9 мм",
                quantity: "54 шт.",
                PiecePrice: "715.00",
                cost: "38 057.00"
            },
            {
                id: 7,
                imagePath: "../src/images/image7.png",
                name: "Аэратор коньковый AIRIDGE FELT",
                quantity: "26 шт.",
                PiecePrice: "350.00",
                cost: "9 052.00"
            },
            {
                id: 8,
                imagePath: "../src/images/image8.png",
                name: "Вентилятор скатный Huopa KTV",
                quantity: "3 уп.",
                PiecePrice: "1 050.00",
                cost: "3 150.00"
            },
            {
                id: 9,
                imagePath: "../src/images/image9.png",
                name: "Мастика битумная, 3 л",
                quantity: "4 шт.",
                PiecePrice: "2 380",
                cost: "7 355.00"
            },
            {
                id: 10,
                imagePath: "../src/images/image10.png",
                name: "Гвозди кровельные ершеные (упаковка 5 кг)",
                quantity: "4 уп.",
                PiecePrice: "750",
                cost: "2 318.00"
            },
        ]
    }];
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        const isLoggedIn = opts.headers['Authorization'] === 'Bearer 86fasfgfsogHGad';

        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {
                // authenticate - public
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    const params = JSON.parse(opts.body);
                    const user = users.find(x => x.email === params.email && x.password === params.password);
                    if (!user) return error('email or password is incorrect');
                    return ok({
                        id: user.id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        token: '86fasfgfsogHGad'
                    });
                }

                // get users - secure
                if (url.endsWith('/users') && opts.method === 'GET') {
                    if (!isLoggedIn) return unauthorised();
                    return ok(users);
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

                // private helper functions

                function ok(body) {
                    resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) })
                }

                function unauthorised() {
                    resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorised' })) })
                }

                function error(message) {
                    resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) })
                }
            }, 500);
        });
    }
}