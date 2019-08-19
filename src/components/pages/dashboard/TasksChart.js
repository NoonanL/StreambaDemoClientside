import React from "react";
import styled from "styled-components";
import getTasks from "../../../services/Tasks/getTasks";
import getObject from "../../../services/getObject";

import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  Chip as MuiChip,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core";

import { red, green, orange, } from "@material-ui/core/colors";

import { spacing } from "@material-ui/system";

const Card = styled(MuiCard)(spacing);

const CardContent = styled(MuiCardContent)(spacing);

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${props => props.rgbcolor};
  color: ${props => props.theme.palette.common.white};
`;

const Paper = styled(MuiPaper)(spacing);

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${props => props.theme.spacing(12)}px);
`;

class TasksTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: false,
          error: '',
          access: '',
          results: [],
          data: [],
        };
      }
    
      //On component mount get acces key from main
      componentDidMount() {
        //   this.setState({access: ipcRenderer.sendSync('fetch-access')})
          getTasks().then(response => {
            this.setState({
              data: response,
              results: response.results,
              loading: false
            });
        })
        //loop through each result(task)
        //fetch user details(name) from the url
        //change that tasks name variable to the fetched username
        
      }

      statusCheck(status){
        if(status === 'completed'){
            return(<Chip label="Done" rgbcolor={green[500]}/>)
        }
          else if(status === 'pending'){
              return(<Chip label="In Progress" rgbcolor={orange[500]} />)
          }
          else if(status === 'cancelled'){
            return(<Chip label="Cancelled" rgbcolor={red[500]} />)
        }else{
            return(<Chip label="Unknown" rgbcolor={orange[500]}/>)
        }
      }

      render(){
          return(<Card mb={6}>
            <CardContent pb={1}>
              <Typography variant="h6" gutterBottom>
                Latest Staff Tasks
              </Typography>
            </CardContent>
            <Paper>
              <TableWrapper>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell>Staff Member</TableCell>
                      <TableCell>State</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.results.map(row => (
                      <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {row.title}
                        </TableCell>
                        <TableCell>{row.user}</TableCell>
                        <TableCell>{this.statusCheck(row.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableWrapper>
            </Paper>
          </Card>);

      }
}
export default TasksTable;
