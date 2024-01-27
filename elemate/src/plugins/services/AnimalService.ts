import axios, { AxiosResponse } from 'axios';
import { AnimalModel } from '../models/AnimalModel';

export class AnimalService {
  private clientId: string;
  private clientSecret: string;
  private accessToken: string | null = null;

  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  private async getAccessToken(): Promise<string> {
    if (this.accessToken) {
      return this.accessToken;
    }

    const tokenUrl = 'https://api.petfinder.com/v2/oauth2/token';
    const tokenParams = `grant_type=client_credentials&client_id=${this.clientId}&client_secret=${this.clientSecret}`;

    try {
      const response: AxiosResponse = await axios.post(tokenUrl, tokenParams);
      this.accessToken = response.data.access_token;
      return this.accessToken ?? '';
    } catch (error) {
      console.error('Une erreur est survenue lors de l\'obtention du token', (error as Error).message);
      throw new Error('Impossible d\'obtenir le token.'); // Il y a souvent un soucis avec leur API donc des fois elle répond pas donc faut juste recharger jusqu'à ce que ça marche
    }
  }

  async getAnimals(): Promise<AnimalModel[]> {
    try {
      const accessToken = await this.getAccessToken();
      const apiUrl = 'https://api.petfinder.com/v2/animals?limit=50';

      const response: AxiosResponse = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      interface AnimalApiResponse {
        id: number;
        name: string;
        type: string;
        description: string;
        photos: { small: string }[];
        url: string;
      }

      const animals: AnimalModel[] = response.data.animals.map((animal: AnimalApiResponse) => ({
        id: animal.id,
        name: animal.name,
        type: animal.type,
        description: animal.description,
        photo: animal.photos.length > 0 ? animal.photos[0].small : '', // J'affiche seulement la première photo (small)
        url: animal.url,
      }));

      return animals;
    } catch (error) {
      console.error('Une erreur est survenue lors de la requête pour récupérer les animaux:', (error as Error).message);
      throw new Error('Impossible de récupérer les animaux.');
    }
  }
}