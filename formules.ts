import {Balance} from "./types";

export function liquiditeit(balance:Balance):number{
    let liquiditeit = balance.currentAssets/balance.shortTermDebts;
    return liquiditeit;
}

export function solvabiliteit(balance:Balance):number{
    let solvabiliteit = (balance.equity/balance.totalPassive)*100;
    return solvabiliteit;
}

export function rentabiliteit(balance:Balance):number{
    let rentabiliteit = (balance.profit/balance.equity)*100;
    return rentabiliteit;
}
