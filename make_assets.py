"""
대시보드용 에셋 생성 스크립트
- GIF 2개: pi0_flow (플로우 매칭), rtc_match (실시간 청킹)
- mp4 루프 2개: 위 GIF의 경량 mp4 버전 (대시보드 <video> 용)
- 정적 프레임 3개: wfm_cosmos, rd_vla_graph, pi06_value
"""
import os
import subprocess
import sys

# yt-dlp 경로 (PATH에 없을 수 있으므로 전체 경로)
YTDLP = os.path.join(os.path.dirname(sys.executable), 'Scripts', 'yt-dlp.exe')
if not os.path.exists(YTDLP):
    YTDLP = 'yt-dlp'  # fallback

FFMPEG = None
# imageio_ffmpeg 내장 ffmpeg 사용 + PATH에 등록 (yt-dlp가 찾을 수 있도록)
try:
    import imageio_ffmpeg
    FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
    ffmpeg_dir = os.path.dirname(FFMPEG)
    os.environ['PATH'] = ffmpeg_dir + os.pathsep + os.environ.get('PATH', '')
except:
    FFMPEG = 'ffmpeg'

ASSETS_DIR = './assets'
os.makedirs(ASSETS_DIR, exist_ok=True)

def run_cmd(cmd, desc=""):
    print(f"  > {desc}")
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"  [FAIL] {result.stderr[:300]}")
        return False
    return True

def download_segment(url, start, end, output_mp4):
    """yt-dlp로 특정 구간 다운로드"""
    cmd = [
        YTDLP,
        '-f', 'bestvideo[ext=mp4][height<=720]+bestaudio[ext=m4a]/best[ext=mp4]/best',
        '--download-sections', f'*{start}-{end}',
        '--force-keyframes-at-cuts',
        '-o', output_mp4,
        '--no-warnings',
        url
    ]
    return run_cmd(cmd, f"다운로드: {url} ({start}s~{end}s)")

def mp4_to_gif(input_mp4, output_gif, fps=12, width=480):
    """ffmpeg로 mp4 → 최적화 GIF 변환"""
    cmd = [
        FFMPEG, '-y', '-i', input_mp4,
        '-vf', f'fps={fps},scale={width}:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=bayer',
        '-loop', '0',
        output_gif
    ]
    return run_cmd(cmd, f"GIF 변환: {output_gif}")

def mp4_to_loop(input_mp4, output_mp4, width=480):
    """ffmpeg로 경량 루프 mp4 생성 (대시보드 <video> 용)"""
    cmd = [
        FFMPEG, '-y', '-i', input_mp4,
        '-vf', f'scale={width}:-2',
        '-c:v', 'libx264', '-preset', 'slow', '-crf', '28',
        '-an', '-movflags', '+faststart',
        output_mp4
    ]
    return run_cmd(cmd, f"MP4 루프: {output_mp4}")

def extract_frame(url, timestamp, output_img):
    """yt-dlp + ffmpeg로 특정 타임스탬프 프레임 추출 → WebP"""
    temp = f'temp_frame_{os.path.basename(output_img)}.mp4'
    # 해당 초 근처 2초만 다운로드
    start = max(0, timestamp - 1)
    end = timestamp + 1

    if not download_segment(url, start, end, temp):
        return False

    cmd = [
        FFMPEG, '-y', '-i', temp,
        '-vf', 'scale=960:-1',
        '-frames:v', '1',
        '-q:v', '85',
        output_img
    ]
    ok = run_cmd(cmd, f"프레임 추출: {output_img}")

    if os.path.exists(temp):
        os.remove(temp)
    return ok


if __name__ == '__main__':
    print("=" * 50)
    print("  대시보드 에셋 생성 시작")
    print("=" * 50)

    # ═══════════════════════════════════════
    # GIF + MP4 루프 (2개)
    # ═══════════════════════════════════════
    gif_tasks = [
        {
            'name': 'pi0_flow',
            'url': 'https://youtu.be/8V2a8Ty5-yk',
            'start': 570, 'end': 590,  # 60초→20초로 트리밍
            'desc': 'π0 플로우 매칭 시각화'
        },
        {
            'name': 'rtc_match',
            'url': 'https://youtu.be/8V2a8Ty5-yk',
            'start': 1380, 'end': 1396,  # 16초 그대로
            'desc': 'RTC 실시간 청킹'
        },
    ]

    for task in gif_tasks:
        print(f"\n[GIF] {task['desc']} ({task['name']})")
        temp_mp4 = f"temp_{task['name']}.mp4"
        gif_path = os.path.join(ASSETS_DIR, f"{task['name']}.gif")
        mp4_path = os.path.join(ASSETS_DIR, f"{task['name']}.mp4")

        if download_segment(task['url'], task['start'], task['end'], temp_mp4):
            mp4_to_gif(temp_mp4, gif_path, fps=12, width=480)
            mp4_to_loop(temp_mp4, mp4_path, width=480)

        if os.path.exists(temp_mp4):
            os.remove(temp_mp4)

    # ═══════════════════════════════════════
    # 정적 프레임 추출 (3개) → WebP
    # ═══════════════════════════════════════
    frame_tasks = [
        {
            'name': 'wfm_cosmos',
            'url': 'https://youtu.be/Ymj4c0qzZHA',
            'timestamp': 1070,  # 17:50 부근 핵심 프레임
            'desc': 'WFM Cosmos 세계 모델 예측'
        },
        {
            'name': 'rd_vla_graph',
            'url': 'https://youtu.be/sx2ytqe3hcI',
            'timestamp': 1554,  # 25:54 부근 성능 그래프
            'desc': 'RD-VLA 성능 비교 그래프'
        },
        {
            'name': 'pi06_value',
            'url': 'https://youtu.be/QyijoQ-eQ5c',
            'timestamp': 1410,  # 23:30 부근 가치함수
            'desc': 'π0.6 RL 가치함수'
        },
    ]

    for task in frame_tasks:
        print(f"\n[FRAME] {task['desc']} ({task['name']})")
        output = os.path.join(ASSETS_DIR, f"{task['name']}.webp")
        extract_frame(task['url'], task['timestamp'], output)

    # ═══════════════════════════════════════
    # 결과 요약
    # ═══════════════════════════════════════
    print("\n" + "=" * 50)
    print("  생성된 파일 목록")
    print("=" * 50)
    for f in sorted(os.listdir(ASSETS_DIR)):
        fpath = os.path.join(ASSETS_DIR, f)
        size_mb = os.path.getsize(fpath) / (1024 * 1024)
        print(f"  {f:30s}  {size_mb:.1f} MB")
    print("=" * 50)
