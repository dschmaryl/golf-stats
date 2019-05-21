import React from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { hideRoundDialog } from '../../../../actions/rounds';

import { AppStateType } from '../../../../types';
import { Round } from '../../../../types/rounds';

import { SelectedRoundTable } from './SelectedRoundTable';

interface PropTypes {
  showRoundDialog: boolean;
  round: Round;
  hideRoundDialog: Function;
}

export const SelectedRoundComponent: React.FC<PropTypes> = ({
  showRoundDialog,
  round,
  hideRoundDialog
}) => (
  <Dialog
    open={showRoundDialog}
    onClose={event => hideRoundDialog()}
    maxWidth="md"
    fullWidth={true}
  >
    <DialogTitle>
      {round
        ? round.date.split(' ')[0] +
          (round.roundData ? ' - ' + round.roundData['course_name'] : '')
        : ''}
    </DialogTitle>
    <DialogContent>
      <SelectedRoundTable />
    </DialogContent>
    <DialogActions>
      <Button
        variant="outlined"
        style={{ marginTop: '10px' }}
        onClick={event => hideRoundDialog()}
      >
        close
      </Button>
    </DialogActions>
  </Dialog>
);

const mapStateToProps = (state: AppStateType) => ({
  showRoundDialog: state.rounds.showRoundDialog,
  round: state.rounds.data[state.rounds.selectedRoundIndex]
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppStateType, null, AnyAction>
) => ({
  hideRoundDialog: () => dispatch(hideRoundDialog())
});

export const SelectedRound = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectedRoundComponent);
