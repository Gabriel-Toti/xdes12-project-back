export interface INotification {
  id: string;
  id_user: string;
  type: 'match_accepted' | 'new_announcement' | 'reminder' | 'system';
  title: string;
  message: string;
  link?: string;
  read: boolean;
  created_at: Date;
}

export interface ICreateNotification {
  id_user: string;
  type: 'match_accepted' | 'new_announcement' | 'reminder' | 'system';
  title: string;
  message: string;
  link?: string;
}

