export interface Perfume {
    id: number;
    brand_name: string;
    model_name: string;
    description: string;
    price: number;
    image_url: string;
    gender: 'male' | 'female';
}

export interface PerfumeDetailInfo extends Perfume {
    item_form: string;
    item_volume: string;
    target_audience: string;
    scent: string;
}
