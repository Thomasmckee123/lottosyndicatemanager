import axios from "../integrations/instance";

const writeAReview = (syndicateId: number, userId: number, title: string, review: string) => {
const data = {
    title: title,
    content: review
}




    return axios.post(`/reviews/syndicates/${syndicateId}/users/${userId}`, data);
    }




    export {writeAReview}