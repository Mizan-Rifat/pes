import React from 'react'
import MCarousel from '../Carousel/MCarousel'
import Title from './Components/Title'
import HeaderTabs from './Components/HeaderTabs'
import { Container } from '@material-ui/core'

export default function MTournament(props) {

    const detailSlug = props.match.params.details
    return (
        <div>
            <MCarousel />

            <Container style={{height:'500px'}}>
                <Title title='Premier League' />
                <HeaderTabs detailSlug={detailSlug} />
            </Container>
        </div>
    )
}
