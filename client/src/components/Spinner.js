import {Icon} from 'react-icons-kit';
import {loader} from 'react-icons-kit/feather/loader'
import styled from 'styled-components';

export const Spinner = () => {
    return(
        <Wrapper>
            <div className='load'><Icon className='icon' size='35px' icon={loader}></Icon></div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    height: 167px;
    width: 900px;
    .load{
        padding-left: 400px;
        margin-top: 50px;
    }
    .icon{
        color: darkgrey;
        animation-name: spin;
        animation-duration: 2.5s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        
        @keyframes spin {
            from {transform:rotate(0deg);}
            to {transform:rotate(360deg);}
        }
    }
`;
