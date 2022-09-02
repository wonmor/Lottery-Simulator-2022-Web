# FOR BACK-END DEPLOYMENT... (FLASK)
FROM python:3.10.4-slim
COPY / ./
RUN apt-get update && apt-get install -y python3-dev && python3 -m pip install --upgrade pip
COPY requirements.txt ./
RUN pip3 install -r ./requirements.txt
# Pretty much pass everything in the root folder except for the client folder, as we do NOT want to overwrite the pre-generated client folder that is already in the ./app folder
EXPOSE 5000
ENTRYPOINT ["python"]
CMD ["main.py"]
