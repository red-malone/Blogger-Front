export interface UserDetails{
    _id: string;
  username: string;
  bio: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  socialLinks: {
    twitter: string;
    linkedin: string;
    github: string;
    website: string;
    
  }

}