import Common, { CommonApi } from "./common";
import Bill, { BillApi } from "./bill";

export type ApiType = CommonApi & BillApi;

export default {
    ... Common,
    ... Bill
};