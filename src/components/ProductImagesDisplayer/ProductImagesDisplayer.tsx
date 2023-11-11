import { PromiseState } from '../../interfaces';
import { ErrorThrower } from '../ErrorThrower';
import { Avatar, Box, Skeleton, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react'

interface ImagesDisplayerProps extends PromiseState {
    images?: string[],
}
export default function ProductImagesDisplayer({ images, isLoading, isError }: ImagesDisplayerProps) {
    const { palette: { primary, text } } = useTheme();
    const [current, setCurrent] = useState<string | undefined>(images?.[0]);

    useEffect(() => { setCurrent(images?.[0]) }, [images])

    return (
        <Box sx={{ display: "flex", flexBasis: "50%", flexDirection: "column", gap: 1.5 }}>
            {
                isLoading ? <Skeleton width={"100%"} height={350} variant="rounded" sx={{ bgcolor: "rgb(0 0 0 / 20%)" }} />
                    : isError ? <ErrorThrower
                        title='Filed To load images'
                        hideAlertMsg
                        disableHeight
                        illustratorType="unexpected"
                    />
                        : <Avatar
                            key="img"
                            alt="product's image" src={current ?? ""}
                            sx={{
                                width: "100%",
                                height: "400px",
                                borderRadius: 0,
                                "& > img": { objectFit: "contain" }
                            }}
                        />
            }
            {
                isLoading ? <Skeleton width={"100%"} height={45} variant="rounded" sx={{ bgcolor: "rgb(0 0 0 / 20%)" }} />
                    : isError ? null
                        : <Box key="bar" sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                            {
                                images?.map((url: string, i: number) =>
                                    <Avatar
                                        key={"img-" + i} src={url ?? ""}
                                        sx={{
                                            borderRadius: 1,
                                            border: "solid 2px", objectFit: "fill",
                                            borderColor: url === current ? primary.main : text.primary
                                        }}
                                        onClick={() => { setCurrent(url) }} />
                                )
                            }
                        </Box>
            }
        </Box>
    )
}