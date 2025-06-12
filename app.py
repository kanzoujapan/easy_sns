from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import json
import os
from datetime import datetime


app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'static/uploads'
POSTS_FILE = "posts.json"
DATA_FILE = 'accounts.json'

# POSTエンドポイント（画像＋コメント）
@app.route("/post", methods=["POST"])
def post():
    if "image" not in request.files:
        return jsonify({"error": "No image"}), 400
    image = request.files["image"]
    comment = request.form.get("comment", "")

    # ファイル名を日付＋元の名前でユニークにする
    filename = datetime.now().strftime("%Y%m%d%H%M%S_") + image.filename
    save_path = os.path.join(UPLOAD_FOLDER, filename)
    image.save(save_path)

    # 投稿データを記録
    post_data = {
        "image_url": f"/static/uploads/{filename}",
        "comment": comment,
        "created_at": datetime.now().isoformat()
    }

    # 既存データの読み込み
    if os.path.exists(POSTS_FILE):
        with open(POSTS_FILE, "r") as f:
            posts = json.load(f)
    else:
        posts = []

    posts.append(post_data)

    with open(POSTS_FILE, "w") as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)

    return jsonify({"message": "Complete", "post": post_data})

# 画像ファイルの配信（開発用）
@app.route("/static/uploads/<filename>")
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)


@app.route("/register", methods = ["POST"])

def register():
    data = request.get_json()

    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as f:
            accounts = json.load(f)
    else:
        accounts = []

    accounts.append(data)

    with open(DATA_FILE, 'w') as f:
        json.dump(accounts, f, ensure_ascii = False, indent = 2)

    print(f'Save the data: {data}')
    return jsonify({'message': 'Complete!', 'data': data})

@app.route('/accounts', methods = ['GET'])
def get_accounts():
    import os, json
    DATA_FILE = 'accounts.json'
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as f:
            accounts = json.load(f)
    else:
        accounts = []

    return jsonify(accounts)

@app.route('/posts', methods = ['GET'])
def get_posts():
    if os.path.exists(POSTS_FILE):
        with open(POSTS_FILE, 'r') as f:
            posts = json.load(f)

    else:
        posts = []

    return jsonify(posts)


if __name__ == '__main__':
    os.makedirs(UPLOAD_FOLDER, exist_ok = True)
    app.run(debug = True)
