import {Balans} from "./types";

export function liquiditeit(balans:Balans):number{
    let liquiditeit = (balans.vlottendeActiva/balans.korteTermijnSchulden);
    return liquiditeit;
}

export function solvabiliteit(balans:Balans):number{
    let solvabiliteit = (balans.eigenVermogen/balans.totaalPassief)*100;
    return solvabiliteit;
}
