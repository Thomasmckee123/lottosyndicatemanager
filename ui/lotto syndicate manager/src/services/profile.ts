import axios from "../integrations/instance";


const fetchProfileData = async(userId: number) =>{
    try{
        const response = await axios.get(`users/${userId}`);
    console.log("REVIEWS RESPONSE DATA", response.data)
        return response.data;
        
    }catch(error){
        console.error("error getting reviews by syndicate id", error);
    }
    }
    


    const takeAPhoto = async(userId: number, image:string) =>{
        try{
            const photoData = {
            image: image
            }
            const response = await axios.put(`users/photo/${userId}`, photoData);
            return response.data;
        }catch(error){
            console.error("error updating photo", error);
        }
        }   

        const uploadImage = async(userId: number, images:File) =>{
            try{
                const formData = new FormData();
                formData.append('file', images);
          
                const response = await axios.post(`/images/${userId}`, formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                });
                return response.data;
            }catch(error){
                console.error("error updating photo", error);
            }
            }   


         export {fetchProfileData, takeAPhoto, uploadImage}