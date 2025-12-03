export interface Blog {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    username: string;
  };
  category: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  isPublished: boolean;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  _id: string;
  comment: string;
  user: {
    _id: string;
    username: string;
  };
  date: Date;
}