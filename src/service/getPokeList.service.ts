import type { ResponseListPokemon } from "@/domain/pokemon/pokemon.dto";
import type { Service } from "./service";
import type { HttpGateway } from "@/domain/http/http.gateway";
import { BASE_API_PATHS } from "@/infra/constants/BASE_API_PATHS.constants";

type InputDTO = {
  limit: number;
  offset: number;
  signal?: AbortSignal | undefined;
};

export class GetPokeListService
  implements
    Service<
      InputDTO,
      Promise<
        Omit<ResponseListPokemon, "next" | "previous"> & {
          next: string | null;
          previous: string | null;
        }
      >
    >
{
  private readonly http: HttpGateway;
  constructor(http: HttpGateway) {
    this.http = http;
  }
  async execute({ limit, offset, signal }: InputDTO): Promise<
    Omit<ResponseListPokemon, "next" | "previous"> & {
      next: string | null;
      previous: string | null;
    }
  > {
    const response = await this.http.get<
      Omit<ResponseListPokemon, "next" | "previous"> & {
        next: string | null;
        previous: string | null;
      }
    >(BASE_API_PATHS.poke_list, {
      queries: { limit, offset },
      signal,
    });

    return response;
  }
}
