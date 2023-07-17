//interface for reviews
interface IReviews{
    id: number,
    created_date: Date,
    title: string,
    content: string,
    users:{ 
first_name: string,
last_name: string,
    },
    syndicates:{
        name: string,
    }
}

export{IReviews };