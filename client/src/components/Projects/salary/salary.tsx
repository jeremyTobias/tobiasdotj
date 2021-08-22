import React, {useEffect, useState} from 'react';

interface State {

}

function Salary() {
    const [predSal, setPredSal] = useState();
    const [coachData, setCoachData] = useState<State>({
        'const' : [1, 1, 1],
        'Bonus' : [406000, 295000, 725093.5116],
        'BonusPaid' : [102001.0698, 145000, 102001.0698],
        'Buyout' : [1150000, 2160417, 6734453.264],
        'head_coaches - seasons_coached' : [3, 8, 6],
        'head_coaches - wl_pct' : [0.414, 0.636, 0.553],
        'head_coaches - tournament_wl_pct' : [0, 1, 0],
        'AvgAttendance' : [13118, 21953, 41696],
        'StadiumCapacity' : [25319, 30000, 68400],
        'PctCapacity' : [51.81, 73.18, 60.96],
        'MULTIYR_ELIG_RATE' : [0.9138461538, 0.9553903346, 0.9658385093],
        'MULTIYR_RET_RATE' : [0.9549689441, 0.9530075188, 0.937007874],
        'gsr' : [79, 77, 86],
        'fgr' : [53, 65, 56],
        'Conference_Atlantic_Coast_Conference' : [0, 0, 1],
        'Conference_Big_12_Conference' : [0, 0, 0],
        'Conference_Big_Ten_Conference' : [0, 0, 0],
        'Conference_Conference_USA' : [0, 0, 0],
        'Conference_Independent' : [0, 0, 0],
        'Conference_Mid - American_Conference' : [1, 0, 0],
        'Conference_Mountain_West_Conference' : [0, 0, 0],
        'Conference_Pac - 12_Conference' : [0, 0, 0],
        'Conference_Southeastern_Conference' : [0, 0, 0],
        'Conference_Sun_Belt_Conference' : [0, 1, 0],
    });

    useEffect(() => {
        fetch('/salary', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                coachData: coachData
            })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                let curData = data.data.map((d: any) => {
                    return(
                        <p key={'salaryKey-' + d}>
                            Predicted salary is {d.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD'
                            })}
                        </p>
                    );
                }) || 'Nothing to show';
                setPredSal(curData);
            });
    }, []);

    return (
      <React.Fragment>
          {predSal}
      </React.Fragment>
    );
}

export default Salary;
