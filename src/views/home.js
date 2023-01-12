import styled from 'styled-components';
import Title from '../components/title';

export default function Home() {
    return (
        <HomeWrapper>
            <Title title='Jayden Nikifork' />
            <div style={{height: '2000px'}}>

            </div>
        </HomeWrapper>
    )
}

const HomeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;