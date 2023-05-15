export interface RecipeListType {
    results:      Result[];
    offset:       number;
    number:       number;
    totalResults: number;
}

export interface Result {
    id:        number;
    title:     string;
    image:     string;
    imageType: ImageType;
}

export enum ImageType {
    Jpg = "jpg",
}
