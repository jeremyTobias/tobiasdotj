import React, {useEffect, useState} from 'react';
import Zillow from './zillow/zillow';
import Rideshare from './rideshare/rideshare';
import Salary from './salary/salary';

interface Props {
    proj?: string;
}

function Project(props: Props) {
    const proj = props.proj;
    const [projectData, setProjectData] = useState();


    useEffect(() => {
        console.log(proj);
        if (proj === 'zillow' || proj === undefined) {
            // @ts-ignore
            setProjectData(<Zillow />)
        } else if (proj === 'salary') {
            // @ts-ignore
            setProjectData(<Salary />)
        } else if (proj === 'rideshare') {
            // @ts-ignore
            setProjectData(<Rideshare />)
        }
    }, [proj]);

    return(
        <div>{projectData}</div>
    )
}

export default Project;
