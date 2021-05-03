export interface IShow {
    id: number;
    url: string;
    name: string;
    season: number;
    number: number;
    type: string;
    airdate: string;
    airtime: string;
    airstamp: string;
    runtime: number;
    image: string;
    summary: string;
    show: IShowSummary;
    _links: {
        self: {
            href: string;
        };
    };
}

export interface IShowActions {
    type: string;
    shows?: IShow[];
    showSummary?: IShowSummary;
    error?: string;
}

export interface IShowState {
    shows: IShow[];
    showSummary: IShowSummary;
    categories: string[];
    loading: boolean;
}

export interface IShowSummary {
    id: number;
    url: string;
    name: string;
    type: string;
    language: string;
    genres: string[];
    status: string;
    runtime: number;
    averageRuntime: number;
    premiered: string;
    officialSite: string;
    schedule: {
        time: string;
        days: string[];
    };
    rating: {
        average: number;
    };
    weight: number;
    network: {
        id: number;
        name: string;
        country: {
            name: string;
            code: string;
            timezone: string;
        };
    };
    webChannel: {
        id: number;
        name: string;
        country: {
            name: string;
            code: string;
            timezone: string;
        };
    };
    dvdCountry: null;
    externals: {
        tvrage: number;
        thetvdb: number;
        imdb: string;
    };
    image: {
        medium: string;
        original: string;
    };
    summary: string;
    updated: number;
    _links: {
        self: {
            href: string;
        };
        previousepisode: {
            href: string;
        };
        nextepisode: {
            href: string;
        };
    };
}

export interface ICategory {
    label: string;
    data: IShowSummary[];
}
