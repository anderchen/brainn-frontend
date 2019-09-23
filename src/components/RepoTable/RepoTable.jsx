import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import classes from './RepoTable.module.css';


const RepoTable = (props) => {
  
  const createData = (repository, description, language, tags, repo_id, url) => {
    return { repository, description, language, tags, repo_id, url };
  }

  const rows = props.repos.map(repo => (
    createData(repo.repo_name, repo.description, repo.language, repo.tags.map(e => e.name).join(', '), repo.repo_id, repo.url)
  ))

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Repository</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Language</TableCell>
            <TableCell>Tags</TableCell>
            <TableCell>Edit Tags</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.repository}>
              <TableCell>
                <a href={row.url} target="_blank" rel="noopener noreferrer">
                  {row.repository}
                </a>
              </TableCell>
              <TableCell component="th" scope="row">{row.description}</TableCell>
              <TableCell>{row.language}</TableCell>
              <TableCell>{row.tags}</TableCell>
              <TableCell>
                <button onClick={props.clicked} value={row.repo_id}>Edit</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default RepoTable;