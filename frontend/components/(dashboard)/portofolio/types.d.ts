export interface IDataWatchList extends String<string, any> {
   symbol: string;
   last_close: number;
   mandelbrot_channel_buy: number;
   mandelbrot_channel_sell: number;
   up_down: string;
   risk_reward: number;
   asset_class: string;
   sector: string;
   humbl_suggestion: string;
}
