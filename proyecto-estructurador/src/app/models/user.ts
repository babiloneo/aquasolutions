export class User{
	constructor(
		public _id: string,
		public nombre: string,
		public materno: string,
		public paterno: string,
		public telefono: string,
		public email: string,
		public role: string,
		public estado: boolean,
		public password: string,
		public image: string
		){}
}