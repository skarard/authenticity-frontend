import AttachFileRoundedIcon from "@mui/icons-material/AttachFileOutlined";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import DriveFolderUploadRoundedIcon from "@mui/icons-material/DriveFolderUploadRounded";
import {
  Box,
  Button,
  Divider,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";

interface IFileUrl {
  type: string;
  name: string;
  src?: string;
}

interface IFileUpload {
  files: (File & { hash?: string; valid?: boolean })[] | null;
  setFiles: (e: (File & { hash?: string; valid?: boolean })[] | null) => void;
  removeRedundants?: boolean;
  disabledDragAndDrop?: boolean;
}

export default function FileUpload({
  files,
  setFiles,
  removeRedundants = true,
  disabledDragAndDrop = false,
}: IFileUpload) {
  const [fileUrl, setFileUrl] = useState<IFileUrl[] | []>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const removeRedundantFiles = (
    fileArray: (File & { hash?: string; valid?: boolean })[]
  ) => {
    const filteredFiles = fileArray.map((x) => {
      const alreadyExists = files?.find(
        (y) => x?.name === y?.name && x?.type === y?.type
      );
      if (!alreadyExists) {
        return x;
      }
      return null;
    });
    return filteredFiles?.filter((el) => el) as (File & {
      hash: string;
      valid: boolean;
    })[];
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const addedFiles = Array.from<File & { hash?: string; valid?: boolean }>(
      e?.target?.files ?? []
    );
    const filteredData: (File & { hash?: string; valid?: boolean })[] =
      removeRedundants ? removeRedundantFiles(addedFiles) : addedFiles;
    setFiles([...(files ?? []), ...filteredData]);
  };

  const openUploader = () => {
    inputRef?.current?.click();
  };

  useEffect(() => {
    let fileUrls: IFileUrl[] = [];
    Array.from(files ?? [])?.map((file) => {
      if (file?.type?.includes("image")) {
        fileUrls.push({
          type: file?.type,
          name: file?.name,
          src: URL.createObjectURL(file),
        });
      } else {
        fileUrls.push({
          type: file?.type,
          name: file?.name,
        });
      }
      return null;
    });
    setFileUrl(fileUrls ?? []);
  }, [files]);

  const handleDrop = (e: any) => {
    e.preventDefault();
    const addedFiles: (File & { hash?: string; valid?: boolean })[] =
      Array.from(e?.dataTransfer?.files ?? []);
    const filteredData: (File & { hash?: string; valid?: boolean })[] =
      removeRedundants ? removeRedundantFiles(addedFiles) : addedFiles;
    setFiles([...(files ?? []), ...filteredData]);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  return (
    <Box sx={{ width: "100%" }}>
      <input
        type="file"
        ref={inputRef}
        style={{
          display: "none",
        }}
        multiple={true}
        onChange={handleFileUpload}
      />

      {disabledDragAndDrop ? (
        <Button
          variant="contained"
          onClick={openUploader}
          sx={{ textTransform: "capitalize" }}
        >
          <AttachFileRoundedIcon fontSize="small" /> Upload Files
        </Button>
      ) : (
        <Box
          width="100%"
          minWidth="300px"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          height="100px"
          border="1px dashed #c3c3c3"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          onClick={openUploader}
          style={{
            cursor: "pointer",
          }}
          id="custom_drop_zone"
        >
          <DriveFolderUploadRoundedIcon fontSize="large" />
          <Box className="description">
            <strong>Choose a file</strong>
            <Box component="span" paddingLeft="5px">
              or drag it here{" "}
            </Box>
          </Box>
        </Box>
      )}
      <Box sx={{ marginY: "20px" }}>
        <DisplayFiles fileUrl={fileUrl} files={files} setFiles={setFiles} />
      </Box>
    </Box>
  );
}

const DisplayFiles = ({
  fileUrl,
  files,
  setFiles,
}: {
  fileUrl: IFileUrl[] | null;
  files: (File & { hash?: string; valid?: boolean })[] | null;
  setFiles: (e: (File & { hash?: string; valid?: boolean })[] | null) => void;
}) => {
  if (!fileUrl) {
    return <></>;
  }
  return (
    <Grid container justifyContent="center" spacing={2}>
      {fileUrl.map((url, i) => (
        <Grid item xs={12} key={i}>
          <FileComponent
            index={i}
            files={files}
            setFiles={setFiles}
            url={url}
          />
        </Grid>
      ))}
    </Grid>
  );
};

const FileComponent = ({
  url,
  files,
  setFiles,
  index,
}: {
  url: IFileUrl;
  files: (File & { hash?: string; valid?: boolean })[] | null;
  index: number;
  setFiles: (e: (File & { hash?: string; valid?: boolean })[] | null) => void;
}) => {
  const changeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = e?.target?.files?.[0];
    const newFileArray = files?.map((file, i) => {
      if (index === i) {
        return newFile ?? file;
      }
      return file;
    });
    setFiles(newFileArray ?? []);
  };

  const deleteImage = () => {
    const newFileArray = files?.filter((_, i) => index !== i);
    setFiles(newFileArray ?? []);
  };

  const singleInputRef = useRef<HTMLInputElement | null>(null);

  const fileUploader = () => {
    singleInputRef?.current?.click();
  };

  const file = files[index];

  const NoMaxWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: "none",
    },
  });

  return (
    <ImageListItem
      key={url?.name}
      style={{
        height: "200px",
      }}
    >
      {file.valid !== undefined && (
        <Box className="absolute right-0 top-0 w-full h-8">
          {file.valid ? <TaskAltIcon /> : <DoDisturbOnOutlinedIcon />}
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <input
          type="file"
          style={{
            display: "none",
          }}
          ref={singleInputRef}
          onChange={changeImage}
        />
        <NoMaxWidthTooltip arrow followCursor title={file.hash ?? ""}>
          <Image
            fill
            style={{ objectFit: "contain" }}
            id={"d" + index}
            src={url.src}
            alt={url.name}
            loading="lazy"
          />
        </NoMaxWidthTooltip>
      </Box>
      <ImageListItemBar
        title={url.name}
        actionIcon={
          <Box display="flex">
            <IconButton
              sx={{ color: "rgba(255, 255, 255, 0.54)" }}
              onClick={fileUploader}
            >
              <AutorenewRoundedIcon />
            </IconButton>
            <IconButton
              sx={{ color: "rgba(255, 255, 255, 0.54)" }}
              onClick={deleteImage}
            >
              <ClearRoundedIcon />
            </IconButton>
          </Box>
        }
      />
    </ImageListItem>
  );
};
