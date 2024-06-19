import { Prices } from "../data/prices";
import { ITokenInfo } from "../types/Token";

export default function swapToken(
  amountToSend: number,
  sendTokenId: string,
  receiveTokenId: string
): number {
  try {
    const sendTokenInfo = Prices.find(
      (token: ITokenInfo) => token.token_id === sendTokenId
    );
    const receiveTokenInfo = Prices.find(
      (token: ITokenInfo) => token.token_id === receiveTokenId
    );

    if (!sendTokenInfo || !receiveTokenInfo) {
      return -1;
    } else {
      const sendTokenPrice = sendTokenInfo.price;
      const receiveTokenPrice = receiveTokenInfo.price;

      const amountReceive = parseFloat(
        ((amountToSend * sendTokenPrice) / receiveTokenPrice).toFixed(8)
      );

      return amountReceive;
    }
  } catch (err) {
    return -1;
  }
}
