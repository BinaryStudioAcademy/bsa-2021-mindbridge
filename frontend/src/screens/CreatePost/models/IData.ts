export interface IForm {
  coverImage: {
    title: string;
    url: string;
  };
  title: string;
  content: string;
  tags: [];
  editedTag: string;

}

export interface IModes {
  htmlMode: boolean;
  markdownMode: boolean;
  editMode: boolean;
  viewMode: boolean;
}
