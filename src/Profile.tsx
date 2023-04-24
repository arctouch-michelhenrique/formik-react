import React from 'react'
import { ProfileProps } from './App'

const Profile = ({data}: ProfileProps) => {
    return <>
        <h1>Oi</h1>
        <ul>
        {data.skills.map((skill) => {
                return <li>{skill}</li>
            }) }

        {data.subSkills.map((subSkill) => {
                return <li>{subSkill}</li>
            }) }

        {data.experiences.map((experience) => {
            return <li>{experience}</li>
        }) }

        {data.additionalInformation.map((information) => {
            return <li>{information}</li>
        }) }


        </ul>
    </>
}

export default Profile