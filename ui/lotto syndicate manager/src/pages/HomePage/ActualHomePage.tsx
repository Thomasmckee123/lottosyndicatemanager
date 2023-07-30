import React from 'react';
import Title from './title';
import ExampleComponent from './drawerAppBar';
import ImageList from '@mui/material/ImageList';
import { ImageListItem } from '@mui/material';
import syndicateCard from './SyndicateCard';
import ButtonAppBar from './componentHeader';


const ActualHomePage = () => {
    return (
        <>
      
     <div>

     <Title /> 
        
        
        </div>       
        

    

        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="jumbotron mt-5">
                       
                       
                    </div>
                </div>
            </div>
        </div>
      <div className='component'>
<ExampleComponent />
</div>
        </>
    );
}

export default ActualHomePage;
