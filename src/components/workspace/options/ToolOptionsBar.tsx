"use client";

import dynamic from "next/dynamic";
import type { WorkspaceToolSlug } from "@/config/tools";
import { converterOptionsCopy } from "@/content/converters";
import type { ToolOptions } from "@/lib/image/options";

const CompressOptionsBar = dynamic(() => import("@/components/workspace/options/CompressOptionsBar").then((module) => module.CompressOptionsBar));
const ConvertOptionsBar = dynamic(() => import("@/components/workspace/options/ConvertOptionsBar").then((module) => module.ConvertOptionsBar));
const CropOptionsBar = dynamic(() => import("@/components/workspace/options/CropOptionsBar").then((module) => module.CropOptionsBar));
const PaletteOptionsBar = dynamic(() => import("@/components/workspace/options/PaletteOptionsBar").then((module) => module.PaletteOptionsBar));
const RotateImageOptionsBar = dynamic(() => import("@/components/workspace/options/RotateImageOptionsBar").then((module) => module.RotateImageOptionsBar));
const ShapeOptionsBar = dynamic(() => import("@/components/workspace/options/ShapeOptionsBar").then((module) => module.ShapeOptionsBar));
const DpiOptionsBar = dynamic(() => import("@/components/workspace/options/DpiOptionsBar").then((module) => module.DpiOptionsBar));
const FormPhotoOptionsBar = dynamic(() => import("@/components/workspace/options/FormPhotoOptionsBar").then((module) => module.FormPhotoOptionsBar));
const HeicOptionsBar = dynamic(() => import("@/components/workspace/options/HeicOptionsBar").then((module) => module.HeicOptionsBar));
const ImageWatermarkOptionsBar = dynamic(() => import("@/components/workspace/options/ImageWatermarkOptionsBar").then((module) => module.ImageWatermarkOptionsBar));
const MetadataOptionsBar = dynamic(() => import("@/components/workspace/options/MetadataOptionsBar").then((module) => module.MetadataOptionsBar));
const OrganizeOptionsBar = dynamic(() => import("@/components/workspace/options/OrganizeOptionsBar").then((module) => module.OrganizeOptionsBar));
const PageNumberOptionsBar = dynamic(() => import("@/components/workspace/options/PageNumberOptionsBar").then((module) => module.PageNumberOptionsBar));
const SignPdfOptionsBar = dynamic(() => import("@/components/workspace/options/SignPdfOptionsBar").then((module) => module.SignPdfOptionsBar));
const PhotoSignOptionsBar = dynamic(() => import("@/components/workspace/options/PhotoSignOptionsBar").then((module) => module.PhotoSignOptionsBar));
const PdfCompressOptionsBar = dynamic(() => import("@/components/workspace/options/PdfCompressOptionsBar").then((module) => module.PdfCompressOptionsBar));
const PdfImageOptionsBar = dynamic(() => import("@/components/workspace/options/PdfImageOptionsBar").then((module) => module.PdfImageOptionsBar));
const PdfPageOptionsBar = dynamic(() => import("@/components/workspace/options/PdfPageOptionsBar").then((module) => module.PdfPageOptionsBar));
const PdfSheetOptionsBar = dynamic(() => import("@/components/workspace/options/PdfSheetOptionsBar").then((module) => module.PdfSheetOptionsBar));
const PassportOptionsBar = dynamic(() => import("@/components/workspace/options/PassportOptionsBar").then((module) => module.PassportOptionsBar));
const ResizeOptionsBar = dynamic(() => import("@/components/workspace/options/ResizeOptionsBar").then((module) => module.ResizeOptionsBar));
const RotateOptionsBar = dynamic(() => import("@/components/workspace/options/RotateOptionsBar").then((module) => module.RotateOptionsBar));
const SvgOptionsBar = dynamic(() => import("@/components/workspace/options/SvgOptionsBar").then((module) => module.SvgOptionsBar));
const TraceOptionsBar = dynamic(() => import("@/components/workspace/options/TraceOptionsBar").then((module) => module.TraceOptionsBar));
const WatermarkOptionsBar = dynamic(() => import("@/components/workspace/options/WatermarkOptionsBar").then((module) => module.WatermarkOptionsBar));

type ToolOptionsBarProps = {
  tool: WorkspaceToolSlug;
  options: ToolOptions;
  onChange: (options: ToolOptions) => void;
  disabled: boolean;
  sourceFile?: File;
};

export function ToolOptionsBar({ tool, options, onChange, disabled, sourceFile }: ToolOptionsBarProps) {
  switch (tool) {
    case "convert-format":
      return (
        <ConvertOptionsBar
          options={options.convert}
          onChange={(convert) => onChange({ ...options, convert })}
          disabled={disabled}
        />
      );
    case "compress-image":
      return (
        <CompressOptionsBar
          options={options.compress}
          onChange={(compress) => onChange({ ...options, compress })}
          disabled={disabled}
        />
      );
    case "resize-image":
      return (
        <ResizeOptionsBar
          options={options.resize}
          onChange={(resize) => onChange({ ...options, resize })}
          disabled={disabled}
        />
      );
    case "edit-metadata":
      return (
        <MetadataOptionsBar
          options={options.metadata}
          onChange={(metadata) => onChange({ ...options, metadata })}
          disabled={disabled}
          sourceFile={sourceFile}
        />
      );
    case "heic-to-jpg":
      return (
        <HeicOptionsBar options={options.heic} onChange={(heic) => onChange({ ...options, heic })} disabled={disabled} />
      );
    case "form-photo":
      return (
        <FormPhotoOptionsBar options={options.form} onChange={(form) => onChange({ ...options, form })} disabled={disabled} />
      );
    case "photo-signature":
      return (
        <PhotoSignOptionsBar
          options={options.photoSign}
          onChange={(photoSign) => onChange({ ...options, photoSign })}
          disabled={disabled}
        />
      );
    case "svg-to-image":
      return <SvgOptionsBar options={options.svg} onChange={(svg) => onChange({ ...options, svg })} disabled={disabled} />;
    case "image-to-svg":
      return (
        <TraceOptionsBar options={options.trace} onChange={(trace) => onChange({ ...options, trace })} disabled={disabled} />
      );
    case "crop-image":
      return (
        <CropOptionsBar
          options={options.crop}
          onChange={(crop) => onChange({ ...options, crop })}
          disabled={disabled}
        />
      );
    case "rotate-image":
      return (
        <RotateImageOptionsBar
          options={options.rotateImage}
          onChange={(rotateImage) => onChange({ ...options, rotateImage })}
          disabled={disabled}
        />
      );
    case "image-watermark":
      return (
        <ImageWatermarkOptionsBar
          options={options.imageWatermark}
          onChange={(imageWatermark) => onChange({ ...options, imageWatermark })}
          disabled={disabled}
        />
      );
    case "shape-image":
      return <ShapeOptionsBar options={options.shape} onChange={(shape) => onChange({ ...options, shape })} disabled={disabled} />;
    case "image-palette":
      return <PaletteOptionsBar options={options.palette} onChange={(palette) => onChange({ ...options, palette })} disabled={disabled} />;
    case "change-dpi":
      return <DpiOptionsBar options={options.dpi} onChange={(dpi) => onChange({ ...options, dpi })} disabled={disabled} />;
    case "passport-photo":
      return (
        <PassportOptionsBar
          options={options.passport}
          onChange={(passport) => onChange({ ...options, passport })}
          disabled={disabled}
        />
      );
    case "organize-pdf":
      return (
        <OrganizeOptionsBar
          options={options.organize}
          onChange={(organize) => onChange({ ...options, organize })}
          disabled={disabled}
        />
      );
    case "pdf-page-numbers":
      return (
        <PageNumberOptionsBar
          options={options.pageNumbers}
          onChange={(pageNumbers) => onChange({ ...options, pageNumbers })}
          disabled={disabled}
        />
      );
    case "pdf-watermark":
      return (
        <WatermarkOptionsBar
          options={options.watermark}
          onChange={(watermark) => onChange({ ...options, watermark })}
          disabled={disabled}
        />
      );
    case "pdf-to-jpg":
      return (
        <PdfImageOptionsBar
          options={options.pdfImage}
          onChange={(pdfImage) => onChange({ ...options, pdfImage })}
          disabled={disabled}
        />
      );
    case "excel-to-pdf":
    case "word-to-pdf":
      return (
        <PdfPageOptionsBar
          options={options.pdfPage}
          onChange={(pdfPage) => onChange({ ...options, pdfPage })}
          disabled={disabled}
          hint={tool === "excel-to-pdf" ? converterOptionsCopy.excelHint : converterOptionsCopy.wordHint}
        />
      );
    case "pdf-to-excel":
      return (
        <PdfSheetOptionsBar
          options={options.pdfSheet}
          onChange={(pdfSheet) => onChange({ ...options, pdfSheet })}
          disabled={disabled}
        />
      );
    case "sign-pdf":
      return (
        <SignPdfOptionsBar
          options={options.signPdf}
          onChange={(signPdf) => onChange({ ...options, signPdf })}
          disabled={disabled}
        />
      );
    case "compress-pdf":
      return (
        <PdfCompressOptionsBar
          options={options.pdfCompress}
          onChange={(pdfCompress) => onChange({ ...options, pdfCompress })}
          disabled={disabled}
        />
      );
    case "rotate-pdf":
      return (
        <RotateOptionsBar
          options={options.rotate}
          onChange={(rotate) => onChange({ ...options, rotate })}
          disabled={disabled}
        />
      );
    default:
      return null;
  }
}
