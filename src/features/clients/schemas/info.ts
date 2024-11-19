export interface ClientList {
	list: string
	clients: { name: string; logo: string }[]
}

export interface InfoConfig {
	clientData: ClientList[]
}
