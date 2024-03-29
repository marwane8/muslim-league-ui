import { GetServerSideProps } from "next"
import { useState } from "react"

import Container from "../../../../components/container"
import Header from "../../../../components/header"
import Panel from "../../../../components/panel"
import DropDown from "../../../../components/widgets/drop-down"
import { Player, makeTeamOptions, TeamData } from "../../../../utils/league-types"
import { getTeams, getRoster, upsertRoster } from "../../../../utils/api/league-api"
import { getValueByKey } from "../../../../utils/utils"

type Props = {
  team_options: {key: number, value: string}[],
  init_team_id: number,
  init_team_name: string,
  init_roster: Player[]
}

export default function EditRoster( { team_options, init_team_id, init_team_name, init_roster }: Props) {
  const [currTeam,setTeam] = useState<number>(init_team_id);
  const [currName,setName] = useState<string>(init_team_name);
  const [roster,setRoster] = useState<Player[]>(init_roster);

  const handleTeamChange = async (e: any) => {
    const team_id = e.target.value;

    const team_name = getValueByKey(Number(team_id),team_options);

    setTeam(team_id);
    setName(team_name);
    const new_roster = await getRoster(team_id, true);
    setRoster(new_roster);
  }  
 
  const handleValueChange = (index: number, prop: string, value: string | number) => {
    let updatedRoster = [...roster];
    if (updatedRoster[index].hasOwnProperty(prop)){
      // @ts-ignore
      updatedRoster[index][prop] = value;
    }
    setRoster(updatedRoster);
  };
  const handleAddPlayer = (e: any) => {
    let updatedRoster = [...roster];
    const init_player: Player = {
          team_id: currTeam,
          team_name: currName,
          active: 0,
          f_name: "first",
          l_name: "last",
          name: "",
          pos: "POS",
          number: "0"
      }
    updatedRoster.push(init_player)
    setRoster(updatedRoster);
  };


  const handleReset = async () =>  {
    const orig_roster = await getRoster(currTeam, true);
    setRoster(orig_roster);
  };

  const handleSubmit = async () =>  {
    let ans = confirm("Are you ready to submit?");
    if (ans === true) {
      roster.forEach((player) => (populateFullName(player)));
      const insertRosterResponse = await upsertRoster(roster,true);
      // const insertRosterResponse = { message: roster};

      if (insertRosterResponse) {
        window.alert(JSON.stringify(insertRosterResponse.message));
      }

    }
  };

  function populateFullName(player: Player) {
    player.name = player.f_name + " " + player.l_name;
  }


    return (
      <Container>
        <Header title='Input Game Stat - Admin | Muslim League CT'/> 
          <Panel
            title='Edit Rosters' >
            <DropDown 
              title='TEAM'
              options={team_options}
              currentOption={currTeam} 
              changeOption={handleTeamChange}
              />

            <div className="border border-gray-200 rounded-md max-w-md overflow-hidden m-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <td className="bg-primary font-bold text-center text-white text-lg"
                        colSpan={5} >
                          {currName}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-gray-100 text-gray-300" >
                      <th className="border-r border-gray-200 w-10"> ACT </th>
                      <th className="border-r border-gray-200"> First </th>
                      <th className="border-r border-gray-200 "> Last </th>
                      <th className="border-r border-gray-200 w-12"> POS </th>
                      <th className="w-12"> # </th>
                  </tr>
                </thead>

                <tbody>
                  {roster.map((player, index) => (
                    <tr  key={index} className={index%2 ? "bg-gray" : ""}>
                      <td className="border-r text-center border-gray-200 ">
                        <input
                          type="checkbox" 
                          checked={Boolean(player.active)}
                          onChange={(e) => handleValueChange(index, "active", Number(e.target.checked))}
                        />
                      </td>

                      <td className={"border-r border-gray-200 " + (player.active? "" : "bg-gray-100" )}>
                        <input 
                          className="bg-opacity-0 w-20 bg-white disabled:text-gray-200 disabled:bg-gray-100"
                          type="text" 
                          value={player.f_name} 
                          onChange={(e) => handleValueChange(index, "f_name", e.target.value)}
                          disabled={!Boolean(player.active)}
                        />
                      </td>
                      <td className={"border-r border-gray-200  " + (player.active? "" : "bg-gray-100" )}>
                        <input 
                          className="bg-opacity-0 bg-white w-20 disabled:text-gray-200 disabled:bg-gray-100"
                          type="text" 
                          value={player.l_name} 
                          onChange={(e) => handleValueChange(index, "l_name", e.target.value)}
                          disabled={!Boolean(player.active)}
                        />
                      </td>

                      <td className={"border-r border-gray-200 " + (player.active? "" : "bg-gray-100" )}>
                        <input 
                          className="bg-opacity-0 bg-white w-8 disabled:text-gray-200 disabled:bg-gray-100"
                          type="text"
                          value={player.pos} 
                          onChange={(e) => handleValueChange(index, "pos", e.target.value)}
                          maxLength={3}
                          disabled={!Boolean(player.active)}
                        />
                      </td>
                      <td className={ (player.active? "" : "bg-gray-100" )}>
                        <input 
                          className="bg-opacity-0 bg-white w-8 disabled:text-gray-200 disabled:bg-gray-100"
                          type="text"
                          value={player.number} 
                          onChange={(e) => handleValueChange(index, "number", e.target.value)}
                          maxLength={2}
                          disabled={!Boolean(player.active)}
                        />
                      </td>

                    </tr>
                  ))}
                  <tr className="bg-gray-300 hover:bg-gray-200"> 
                    <td colSpan={5}>
                    <button className="w-full py-1 text-white font-bold"
                      onClick={(e) => handleAddPlayer(e)}
                      >
                        Add Player +
                        
                    </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex w-1/2 m-auto justify-around my-3">
                <button className=' bg-secondary py-1 px-3 font-bold text-white rounded-md hover:bg-secondary-100'
                            onClick={handleReset}> 
                            Reset 
                </button>
                <button className=' bg-primary py-1 px-3 font-bold text-white rounded-md hover:bg-primary-100'
                            onClick={handleSubmit}> 
                            Submit 
                </button>
            </div>
          </Panel>
      </Container>
  )
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  
  const { sport, season_id } = context.query

  let init_sport = String(sport);
  let init_season_id = Number(season_id);
  let teams: TeamData[] = [];
  let init_team_id = 1;
  let init_team_name = "";
  let init_roster: Player[]=[];

  try {
    teams = await getTeams(init_season_id);
    init_team_id = teams[0].id;
    init_team_name = teams[0].name;
    init_roster = await getRoster(init_team_id);
  } catch (e) {
    console.error('Unable to fetch: ', e);
  }

  let team_options = teams.map((team) => makeTeamOptions(team));

  return { props: { team_options, init_team_id, init_team_name, init_roster }}

}

