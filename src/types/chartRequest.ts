export interface Image {
  height: number
  width: number
  url: string
}

export interface GraphRequest {
  id: string
  title: string
  description: string
  config: Record<string, unknown>
  image: Image
  thumbnail: Image
  created: string
  updated: string
}

export interface GraphRequestResponse {
  graphs: GraphRequest[]
}
