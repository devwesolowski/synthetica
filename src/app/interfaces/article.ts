export interface Article {
    id?: number;
    authorId: number;
    categoryId: number;
    title: string;
    heroImage: string; //URL
    body: string;
    views: number;
    //comments: number[]; I would think would hold an array of commentIDs. FK for comment table, and will hold and
    // supply only those comments that match
    dateAdded: number;
    dateUpdated: number;
  }
