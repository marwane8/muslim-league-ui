import Container from "../../../../components/container"
import Header from "../../../../components/header"
import Panel from "../../../../components/panel"

type Props = {
  season_options: {key: number, value: string}[],
}

export default function InputRoster( {season_options}: Props) {

  return (
      <Container>
        <Header title='Input Game Stat - Admin | Muslim League CT'/> 
          <Panel
            title='Edit Roster' >
              <h1> Add Roster Stuff here</h1>
          </Panel>
      </Container>
  )
}

