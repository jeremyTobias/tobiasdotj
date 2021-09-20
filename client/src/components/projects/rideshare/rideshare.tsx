import React, {useEffect, useState} from 'react';

function Rideshare() {
    const [projectData, setProjectData] = useState();

    useEffect(() => {
        fetch('/rideshare')
            .then((res) => res.json())
            .then((data) => {
                let count = 0;
                let curData = data.data.map((d: any) => {
                    let locData = [];
                    for (const k in d) {
                        locData.push(<td>{d[k]}</td>);
                    }
                    return(
                        <tr key={count++}>
                            {locData.map(item => item)}
                        </tr>
                    );
                }) || 'Nothing to show';
                setProjectData(curData);
            });
    }, []);

    return (
      <table>
          <tbody>
          {projectData}
          </tbody>
      </table>
    );
}

export default Rideshare;
