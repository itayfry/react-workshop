import React, { useCallback, useEffect, useState } from 'react';
import {
    Modal,
    Box,
    Typography,
    IconButton,
    Button,
    Fade,
    Backdrop,
    TypographyProps,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Confetti from 'react-confetti';
import { useAudio } from '../contexts/AudioContext';
import croudSoundUrl from '../assets/croud_cheering.mp3';

type WinnerModalProps = {
    winnerName?: string;
};

const modalStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
    textAlign: 'center',
    outline: 'none',
};

export const WinnerModal: React.FC<WinnerModalProps> = ({
    winnerName = '',
}) => {
    const [open, setOpen] = useState(!!winnerName);
    const [showConfetti, setShowConfetti] = useState(false);
    const { soundEnabled } = useAudio()
    const playAudio = useCallback(() => soundEnabled && (new Audio(croudSoundUrl)).play(), [soundEnabled])

    useEffect(() => {
        if (winnerName) {
            setOpen(true)
        }
    }, [winnerName])

    useEffect(() => {
        if (open) {
            setShowConfetti(true);
            playAudio()
            const timeout = setTimeout(() => setShowConfetti(false), 20_000); // confetti for 20 sec
            return () => clearTimeout(timeout);
        }
        else {
            setShowConfetti(false)
        }
    }, [open, playAudio]);
    const onClose = () => setOpen(false)

    return (
        <>
            {showConfetti && <Box sx={{ position: 'absolute', zIndex: 99999, top: 0, left: 0 }}>
                <Confetti width={window.innerWidth} height={window.innerHeight} recycle={true} numberOfPieces={500} />
            </Box>}
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 300,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={modalStyle}>
                        <Box display="flex" justifyContent="flex-end">
                            <IconButton onClick={onClose} size="small">
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        <CursiveTypography variant="h4" component="h2" gutterBottom>
                            🎉 We have a winner!
                        </CursiveTypography>
                        <Typography variant="h5" color="primary" fontWeight={700} textTransform="capitalize">
                            {winnerName}
                        </Typography>
                        <CursiveTypography variant="body1" sx={{ mt: 2, mb: 3 }}>
                            Congrats on the big win!
                        </CursiveTypography>
                        <Button variant="contained" color="success" onClick={onClose}>
                            Close
                        </Button>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
};

type CursiveTypographyProps = Omit<TypographyProps, "fontFamily">
const CursiveTypography = (props: CursiveTypographyProps) => {
    return <Typography fontFamily={"cursive"} {...props} />
}