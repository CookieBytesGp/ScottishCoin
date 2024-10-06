interface Profile {
    firstName: string;
    lastName: string;
    UserName: string;
    profilePicture: string;
    refralCode: string;
}

interface Scores {
    Score: string;
    profit: string;
    profitCollectCoin: string;
    dateStartCollect: string;
    carts: {
        init: string;
    };
}

interface Currencies {
    coins: string;
}

export class DefaultNames {
    profile: Profile = {
        firstName: "firstName",
        lastName: "lastName",
        UserName: "username",
        profilePicture: "profilePicture",
        refralCode: "refralCode",
    };

    scores: Scores = {
        Score: "score",
        profit: "profit",
        profitCollectCoin: "profitCollectCoin",
        dateStartCollect: "dateStartCollect",
        carts: {
            init: "init",
        },
    };

    currencies: Currencies = {
        coins: "coins",
    };
}
