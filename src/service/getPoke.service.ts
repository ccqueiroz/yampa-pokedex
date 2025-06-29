import type { HttpGateway } from "@/domain/http/http.gateway";
import type { ResponsePokemonService } from "@/domain/pokemon/pokemon.dto";
import type { Service } from "./service";
import { BASE_API_PATHS } from "@/infra/constants/BASE_API_PATHS.constants";

type InputDTO = {
  name?: string;
  id?: string;
  signal?: AbortSignal | undefined;
};

export class GetPokemonService
  implements Service<InputDTO, Promise<ResponsePokemonService | null>>
{
  private readonly http: HttpGateway;
  constructor(http: HttpGateway) {
    this.http = http;
  }

  async execute({
    name,
    id,
    signal,
  }: InputDTO): Promise<ResponsePokemonService | null> {
    const url = id ? BASE_API_PATHS.poke_by_id : BASE_API_PATHS.poke_by_name;

    const response = await this.http.get<ResponsePokemonService | null>(url, {
      params: { name, id },
      signal,
    });

    return response;
  }
}
