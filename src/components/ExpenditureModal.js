import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
  
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{margin:'50px'}}>
      <Button onClick={handleOpen}>Open modal</Button>
          //Modal for adding expenditure
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleExpenditureClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                >
                    <Fade in={open}>
                    <Box 
                    sx={style}
                    >
                       <form onSubmit={handleExpenditureSubmit}>
                            {/* <label>Date</label>
                            <input type="date" value={data.date} onChange={(e) => setData({date: e.target.value, amount: data.amount})} /> <br/>  */}
                            <label>Amount</label> 
                            <input type="number" value={data.amount} onChange={(e) => setData({amount: e.target.value, date: data.date})} /> <br/>
                            <button type="submit" className="btn btn-success" onClick={handleExpenditureClose}>Add</button>
                        </form>
                    </Box>
                    </Fade>
                </Modal>
    </div>



  );
}
