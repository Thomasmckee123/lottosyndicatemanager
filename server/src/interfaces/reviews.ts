//interface for reviews
interface IReviews{
    id: number,
    createdDate: Date,
    title: string,
    content: string,
    users:{ 
firstName: string,
lastName: string,
    },
    syndicates:{
        name: string,
    }
}

export{IReviews };