import useApi, { UseApiOptions } from "@/compositions/useApi";
import { classToPlain } from "class-transformer";



export const useApiGetDrivers = (opts?: UseApiOptions) => useApi<{ page: number }, PaginationResponse<any>>(({ page }) => ({
    method: "GET",
    url: '/drivers',
    params: {
        page
    },

}), opts)

export const useApiGetDriversApplys = (opts?: UseApiOptions) => useApi<{ page: number }, PaginationResponse<any>>(({ page }) => ({
    method: "GET",
    url: '/drivers',
    params: {
        page,
        trips: 'none',
    },

}), opts)

export const useApiUpdateDriver = (opts?: UseApiOptions) => useApi<{payment_group_id: number, antifraud_id: number, id: number}, any>(
    ({payment_group_id, antifraud_id, id}) => ({
    method: "PUT",
    url: `/drivers/${id}`,
    data: {
        payment_group_id,
        antifraud_id
    }

}), opts)

export const useApiGetDriverBlackList = (opts?: UseApiOptions) => useApi<{ page: number }, PaginationResponse<any>>(({ page }) => ({
    method: "GET",
    url: '/drivers',
    params: {
        page
    },

}), opts)


export const useApiDriverSetDefaultCard = (opts?: UseApiOptions) => useApi<{ cardId: number, id: number }, any>(
    ({ cardId, id }) => ({
        method: "POST",
        url: `/driver/${id}/set_default_card`,
        data: {
            card_id: cardId
        }

    }), opts)
export const useApiDriverDeleteCard = (opts?: UseApiOptions) => useApi<{ cardId: number, id: number }, any>(
    ({ cardId, id }) => ({
        method: "DELETE",
        url: `/driver/${id}/delete_card`,
        data: {
            card_id: cardId
        }

    }), opts)
export const useApiDriverAddCard = (opts?: UseApiOptions) => useApi<{ number: number, def: boolean, id: number }, any>(
    ({ number, def, id }) => ({
        method: "POST",
        url: `/driver/${id}/add_card`,
        data: {
            number,
            def
        }

    }), opts)