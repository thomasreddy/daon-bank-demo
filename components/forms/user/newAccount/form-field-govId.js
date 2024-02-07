import React from 'react';
import Image from 'next/image';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from 'components/ui/form';
import { Button } from 'components/ui/button';
import WebCamPhoto from './WebCamPhoto';

const FormFieldGovId = ({ control, isCaptureCompleted, setIsCaptureCompleted, imageSrc, setImageSrc }) => (
    <div className='grid gap-2'>
        <PassportOrDriversId
            control={control}
            imageSrc={imageSrc}
            setImageSrc={setImageSrc} />
        <WebCamPhoto
            control={control}
            isCaptureCompleted={isCaptureCompleted}
            setIsCaptureCompleted={setIsCaptureCompleted} />
    </div>
);

const PassportOrDriversId = ({ control, imageSrc, setImageSrc }) => {
    const handleUploadClick = async (event) => {
        event.preventDefault();
        // Set the field value to the file
        setImageSrc('/example_passport.png');
    };

    return (
        <div className="p-4 bg-neutral-50 rounded-lg ">
            <FormField
                control={control}
                name="govId"
                render={({ field }) => (
                    <FormItem className="relative">
                        <div className='flex items-center justify-between '>
                            <FormLabel className="font-semibold">Upload Passport or Drivers License</FormLabel>
                            <Image src="/id_clarity.png" alt='id_clarity' width={87} height={24} />
                        </div>
                        <FormControl>
                            {imageSrc !== undefined ? (
                                <div className='grid p-4'>
                                    <Image src={imageSrc} alt='example_passport' width={250} height={250} />
                                </div>
                            ) : (
                                <div className='text-center'>
                                    <div className='valign-middle w-full'>
                                        <div>
                                            <Image className='m-auto' src="/upload_file.png" alt='upload_file' width={149} height={186} />
                                        </div>
                                    </div>
                                    <br />
                                    <div>
                                        <Button variant="outline" onClick={handleUploadClick}>Upload Government Issued ID</Button>
                                    </div>
                                </div>
                            )}
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
        </div>
    );
};

export default FormFieldGovId;
