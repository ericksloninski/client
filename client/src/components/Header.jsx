import React from 'react'
import { IconButton } from '@chakra-ui/react'
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { toggleFavorites } from '../redux/actions/productActions'

const Header = () => {
    const disptach = useDispatch();
    const { favoritesToggled } = useSelector((state) => state.product)


  return (
        < >
            { favoritesToggled ? (
                <IconButton 
                    onClick={() => disptach(toggleFavorites(false))}
                    icon={<MdOutlineFavorite size='20px' />} 
                    variant='ghost'
                />
            ) : (
                <IconButton
                    onClick={() => disptach(toggleFavorites(true))}
                    icon={<MdOutlineFavoriteBorder size='20px' />}
                    variant='ghost'
                />
            )}


        </>
    );
};

export default Header